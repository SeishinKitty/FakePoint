import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IListRelatedItem } from "../interfaces/ListInterfaces";

const ListRelatedView = () => {
  const { id } = useParams()
  const [listRelatedItem, setListRelatedItem] = useState<IListRelatedItem>()
  
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/ListRelatedItem/${id}`,
    })
    .then((response: AxiosResponse) => {
        setListRelatedItem( response.data )
    })
  }, [id])

  if(!listRelatedItem){
    return (
      <div>
        <h1>404</h1>
      </div>
    )
  }

  return (
    <div>
      <div>
        Title: {listRelatedItem.title}
      </div>
      <div>
        Related: <Link to={`/List/${listRelatedItem.related?.id}`}>{listRelatedItem.related?.title}</Link>
      </div>
    </div>
  )
};

export default ListRelatedView;
