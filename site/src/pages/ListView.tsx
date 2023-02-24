import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IListItem } from "../interfaces/ListInterfaces";

const ListView = () => {
  const { id } = useParams()
  const [listitem, setListItem] = useState<IListItem>()

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/ListItem/${id}`,
    })
    .then((response: AxiosResponse) => {
        setListItem( response.data )
    })
  }, [id])

  if(!listitem){
    return (
      <div>
        <h1>404</h1>
      </div>
    )
  }

  return (
    <div>
      <div>
        Title: {listitem.title}
      </div>
      <div>
        Related: {listitem.related.map((rel) => <li className="related-link" key={rel.id}><Link to={`/ListRelated/${rel.id}`}>{rel.title}</Link></li>)}
      </div>
    </div>
  )
};

export default ListView;