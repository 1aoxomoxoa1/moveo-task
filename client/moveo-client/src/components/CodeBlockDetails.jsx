import '../css/codeblockdetails.css';
import { useNavigate } from 'react-router-dom';
import { sendToCodeblock } from '../api/codeblock-details';

function CodeBlockDetails({number, name, id, socket}){ 

    //navigate hook
    const navigate = useNavigate();

    return( 
       <div 
        className="codeblock-detail"
        onClick = {() => navigate(`/block?id=${id}`)}
        >
            <h2 className='details-number'> {number}) </h2>
            <h2 className='details-name'> {name} </h2>
       </div>
    )
}

export default CodeBlockDetails;