import axios, { AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IListRelatedItem } from "../interfaces/ListInterfaces";

const ListItem: FC<IListRelatedItem> = ({id, title, related}) => {
  return (
    <tr><td>{id}</td><td><Link to={`/ListRelated/${id}`}>{title}</Link></td><td><Link to={`/List/${related?.id}`}>{related?.title}</Link></td></tr>
  )
}

const ListRelated = () => {
  const [listItems, setListItems] = useState<IListRelatedItem[]>([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/ListRelatedItem",
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

export default ListRelated;
