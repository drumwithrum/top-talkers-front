import './ListItem.style.css';


const ListItem = ({ data, ...props }) => {

  return (
    <tr className="list-item__wrapper" {...props}>
      <td>{data.ip}</td>
      <td>{data.load}</td>
    </tr>
  )
}

export default ListItem