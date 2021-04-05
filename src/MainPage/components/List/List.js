import ListItem from './ListItem';
import './List.style.css';

const List = ({ data }) => {

return (
  <table className="list__wrapper" cellPadding={0} cellSpacing={0}>
    <tbody>
      <tr className="list__header">
        <th>IP Address</th>
        <th>Load [kB]</th>
      </tr>
      {data.map(item => (
        <ListItem data={item} key={`top-talkers-list-item-${item.ip}`} />
      ))}   
    </tbody>

  </table>

)
        }
export default List