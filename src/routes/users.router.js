import {Router} from 'express';
import { uploader } from '../uploader.js';


const router = Router();

const users = [
    { id: 1, firstName: 'Juan', lastName: 'Perez' },
    { id: 2, firstName: 'Carlos', lastName: 'Hernandez' },
    { id: 3, firstName: 'Luis', lastName: 'Gonzalez' },
    { id: 4, firstName: 'Alejo', lastName: 'Farias' },
    { id: 5, firstName: 'Florencia', lastName: 'Saucedo' }
];

const auth = (req, res, next) => {
    console.log('Ejecuta el middleware de autenticación de usuario');
    next();
}

router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: users });
});

router.post('/', auth, uploader.single('thumbnail'), (req, res) => { 
    const { firstName, lastName } = req.body; 

    if (firstName != '' && lastName != '') {
        const maxId = Math.max(...users.map(element => +element.id));
        const newUser = { id: maxId + 1, firstName: firstName, lastName: lastName };
        users.push(newUser);
        res.status(200).send({ error: null, data: newUser, file: req.file });
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

router.put('/:id', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    
    if (index > -1) {
        users[index] = req.body;
        res.status(200).send({ error: null, data: users[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

router.delete('/:id', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    
    if (index > -1) {
        users.splice(index, 1);
        res.status(200).send({ error: null, data: 'Usuario borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

export default router;