import Button from '../button/Button';

const uploadForm = (props) => {


return (
<div className="section">
    <form className="formStyle" onSubmit={props.processFile}>
    <input type="file" name="data" onChange={props.changeHandler} />
    <Button title="Upload" type="Submit"/>
    </form>
</div>
)

}

export default uploadForm