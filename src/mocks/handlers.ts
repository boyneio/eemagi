import { rest } from 'msw'
import {User, Photo} from '../types';


const root = process.env.REACT_APP_API_URL;

const users: User[] = [
    {
        id: 1,
        username: "jgrant",
        firstName: "Josh",
        lastName: "Grant"
    },
    {
        id: 2,
        username: "arod",
        firstName: "Adan",
        lastName: "Rodrigiez"
    }
];

const photos: Photo[] = [
    {
        id: 1,
        title: "Josh and Adelaide",
        caption: "Ahhh"
    },
    {
        id: 2,
        title: "My Old Car",
        caption: "That was too expensive"
    }
]

export const handlers = [
    rest.get(`${root}user`, (req, res, ctx) => {
        const userId = 1;
        const user = users.find(u => u.id === userId);
        if(!user){
            return res(ctx.status(404));
        }
        return res(
            ctx.status(200),
            ctx.set('Content-Type', 'application/json'),
            ctx.json(user)
        )
    }),
    rest.get(`${root}/photos`, (req, res, ctx) => {
        return res(ctx.json(photos));
    })
]
