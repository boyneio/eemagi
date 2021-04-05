import React from 'react';
import {Photo} from '../../types';
import API from '../../api';

type Props = {};

function usePhotos(): Photo[]{
    const [photos, setPhotos] = React.useState<Photo[]>([]);
    React.useEffect(() => {
        API.get<Photo[]>("photos").then((res) => setPhotos(res.data));
    }, []);
    return photos;
}

export default function ImagePanel(props: Props){
    const photos = usePhotos();
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
