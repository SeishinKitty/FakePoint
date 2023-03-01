import React, { FC, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IListItem } from "../interfaces/ListInterfaces";
import { Link } from "react-router-dom";

const ListItem: FC<IListItem> = ({id, title, related}) => {
  return (
    <tr className="list-view-row">
      <td className="list-view-cell">{id}</td>
      <td className="list-view-cell"><Link to={`/List/${id}`}>{title}</Link></td>
      <td className="list-view-cell">{related.map((rel) => <div className="related-link" key={rel.id}><Link  to={`/ListRelated/${rel.id}`}>{rel.title}</Link></div>)}</td>
    </tr>
  )
}

const List = () => {
  const [listItems, setListItems] = useState<IListItem[]>([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/ListItem",
    })
    .then((response: AxiosResponse) => {
        setListItems( response.data )
    })
  }, [])

  return (
    <div>
      <div className="list-ribbon">
        <button className="new-button">+ New</button>
        <button className="list-ribbon-button">Action 1</button>
        <button className="list-ribbon-button">Action 2</button>
      </div>
      <h1>List</h1>
      <table className="list-view-table">
        <thead className="list-view-head">
          <tr className="list-view-row">
            <td className="list-view-cell">Id</td>
            <td className="list-view-cell">Title</td>
            <td className="list-view-cell">Related</td>
          </tr>
        </thead>
        <tbody>
          { listItems.map((listItem) => <ListItem key={listItem.id} id={listItem.id} title={listItem.title} related={listItem.related} />) }
        </tbody>
      </table>
    </div>
  )
};

export default List;
