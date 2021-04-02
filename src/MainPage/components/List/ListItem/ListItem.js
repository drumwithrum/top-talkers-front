import './ListItem.style.css';


const ListItem = ({ data }) => {

  return (
    <tr className="list-item__wrapper">
      <td>{data.ip}</td>
      <td>{data.load}</td>
    </tr>
  )
}

export default ListItem