import {useParams} from "react-router-dom";

function CollectionShowPage() {
    const {userId,collectionId} = useParams()
    return(
        <div>
            <h1>{userId}</h1>
            <h1>{collectionId}</h1>
        </div>
    )
}
export default CollectionShowPage;