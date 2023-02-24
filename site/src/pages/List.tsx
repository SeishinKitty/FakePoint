import React, { FC, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IListItem } from "../interfaces/ListInterfaces";
import { Link } from "react-router-dom";

const ListItem: FC<IListItem> = ({id, title, related}) => {
  return (
    <tr><td>{id}</td><td><Link to={`/List/${id}`}>{title}</Link></td><td>{related.map((rel) => <div className="related-link" key={rel.id}><Link  to={`/ListRelated/${rel.id}`}>{rel.title}</Link></div>)}</td></tr>
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
      <table>
        <thead><tr><td>Id</td><td>Title</td><td>Related</td></tr></thead>
        <tbody>
          { listItems.map((listItem) => <ListItem key={listItem.id} id={listItem.id} title={listItem.title} related={listItem.related} />) }
        </tbody>
      </table>
    </div>
  )
};

export default List;
