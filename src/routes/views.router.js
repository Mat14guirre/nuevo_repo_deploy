import { Router } from 'express';


const router = Router();


//array con usuarios de prueba
const users = [
    { id: 1, firstName: 'Juan', lastName: 'Perez' },
    { id: 2, firstName: 'Carlos', lastName: 'Perren' },
    { id: 3, firstName: 'Luis', lastName: 'Gonzalez' }
];


router.get('/', (req, res) => {
    const data = {
        firstName: 'Mati',
        lastName: 'Aguirre',
        age: 32,
        email: 'mati.net@gmail.com',
        phone: '+546546546546',
        isAdmin: true,
        users: users
    };
    
    res.status(200).render('index', data);
});


router.get('/register', (req, res) => {
    const data = {
    };
    
    res.status(200).render('register', data);
});

router.get('/chat',(req,res)=>{
    const data={
    };
    res.status(200).render('chat',data)
})


export default router;