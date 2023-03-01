import axios, { AxiosResponse } from "axios";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IListRelatedItem } from "../interfaces/ListInterfaces";

interface IItemProps {
  widths: string[]
  item: IListRelatedItem
  listChecked: {[id: string]:boolean}
  setChecked: Dispatch<SetStateAction<{ [id: string]: boolean }>>
}

const ListItem: FC<IItemProps> = ({widths, item, listChecked, setChecked}) => {
  useEffect(() => {
    if (listChecked[item.id] === undefined) {setChecked({...listChecked, [item.id]: false})}
  }, [item.id, listChecked, setChecked])
  return (
    <div className="list-view-row">
      <div style={{width: widths[0]}}>
        <i className={`list-view-check ${listChecked[item.id] ? "checked" : ""}`} onClick={() => {setChecked({...listChecked, [item.id]: !listChecked[item.id]})}}>✓</i>
      </div>
      <div className="list-view-cell" style={{minWidth: widths[1]}}>{item.id}</div>
      <div className="list-view-cell" style={{minWidth: widths[2]}}><Link to={`/ListRelated/${item.id}`}>{item.title}</Link></div>
      <div className="list-view-cell" style={{minWidth: widths[3]}}><Link to={`/List/${item.related?.id}`}>{item.related?.title}</Link></div>
    </div>
  )
}

const AllSelected = (listChecked: {[id: string]:boolean}) => {
  for (let id in listChecked){
    if (!listChecked[id]) return false
  }
  return true
}

const SelectAll = (listChecked: {[id: string]:boolean}, setChecked: Dispatch<SetStateAction<{ [id: string]: boolean }>>) => {
  let tmp = listChecked
  for (let id in listChecked){
    tmp[id] = true
  }
  for (let id in tmp){
    setChecked({...listChecked, [id]: true})
  }
}

const DeselectAll = (listChecked: {[id: string]:boolean}, setChecked: Dispatch<SetStateAction<{ [id: string]: boolean }>>) => {
  let tmp = listChecked
  for (let id in listChecked){
    tmp[id] = false
  }
  for (let id in tmp){
    setChecked({...listChecked, [id]: false})
  }
}

const ListRelated = () => {
  const [listItems, setListItems] = useState<IListRelatedItem[]>([]);
  const [listChecked, setChecked] = useState<{[id: string]:boolean}>({});

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/ListRelatedItem",
    })
    .then((response: AxiosResponse) => {
        setListItems( response.data )
    })
  }, [])

  const widths: string[] = ["1.6rem", "20rem", "10rem", "10rem"]

  return (
    <div>
      <div className="list-ribbon">
        <button className="new-button">+ New</button>
        <button className="list-ribbon-button">Action 1</button>
        <button className="list-ribbon-button">Action 2</button>
        <button className="list-ribbon-button">Action 3</button>
      </div>
      <h1>ListRelated</h1>
      <div className="list-view-table">
        <div className="list-view-row list-view-head">
          <div style={{width: widths[0]}}>
            <i className={`list-view-check ${AllSelected(listChecked) ? "checked" : ""}`} onClick={(e) => {AllSelected(listChecked) ? DeselectAll(listChecked, setChecked) : SelectAll(listChecked, setChecked)}}>✓</i>
          </div>
          <div className="list-view-cell" style={{minWidth: widths[1]}}>Id</div>
          <div className="list-view-cell" style={{minWidth: widths[2]}}>Title</div>
          <div className="list-view-cell" style={{minWidth: widths[3]}}>Related</div>
        </div>
        { listItems.map((listItem) => <ListItem key={listItem.id} widths={widths} item={listItem} listChecked={listChecked} setChecked={setChecked} />) }
      </div>
    </div>
  )
};

export default ListRelated;
