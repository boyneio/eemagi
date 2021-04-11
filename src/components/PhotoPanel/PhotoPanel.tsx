import React from 'react';
import {Photo} from '../../types';
import API from '../../api';
import {useQuery} from 'react-query';
import Loader from '../utils/loader';

function usePhotos(): {loading: boolean, error: boolean, photos: Photo[]}{
    const [photos, setPhotos] = React.useState<Photo[]>([]);
    const query = useQuery(
        'photos',
        () => API.get<Photo[]>("photos").then((res) => res.data)
    )
    React.useEffect(() => {
        switch (query.status) {
            case 'success':
                setPhotos(query.data);
                break;
            case 'loading':
                setPhotos([]);
                break;
            case 'error':
                setPhotos([]);
                break;
        }
    }, [query.status, query.data]);
    return {
        loading: query.isLoading,
        error: query.isError,
        photos
    }
}

export default function ImagePanel(){
    const {loading, error, photos} = usePhotos();
    if(loading){
        return <Loader />
    }
    if(error){
        return <span>Whoops!</span>
    }
    return (
        <ul>
            {
                photos.map(p => (
                    <li key={p.id}>
                        <figure>
                            <img src={p.thumbnailUrl} alt={p.title} height="150px" />
                            <figcaption>{p.caption}</figcaption>
                        </figure>
                    </li>
                ))
            }
        </ul>
    )
}
