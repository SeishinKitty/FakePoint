export interface IListItem{
  id: string
  title: string
  related: IListRelatedItem[]
}

export interface IListRelatedItem{
  id: string
  title: string
  relatedId?: string
  related?: IListItem
}
