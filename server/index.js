import express from 'express';
import cors from 'cors';
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
    host: 'ep-lucky-star-a6va015z.us-west-2.retooldb.com',
    port: 5432,
    database: 'retool',
    user: 'retool',
    password: 'RLQE4OkxIn0l',
    ssl: { rejectUnauthorized: false }
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/tasks', async (req, res) => {
    try {
        console.log(`app.post('/tasks', async (req, res) => `);
        const result = await db.one('INSERT INTO todos.task (title, user_id, deleted_at) VALUES (${title}, ${user_id}, null) RETURNING *', {
            title: req.body.title,
            user_id: req.body.user_id,
        });
        console.log('result', result);
        res.json({
            title: result.title,
            done: false,
            id: result.id
        });
    } catch (error) {
        console.error('Error inserting task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/gettasks', async (req, res) => {
    try {
        const UserId = req.query.user_id;

        if (!UserId) {
            return res.status(400).json({ error: 'UserId is required' });
        }

        const result = await db.manyOrNone(
            `SELECT todos.task.id, todos.task.title, todos.task.status 
             FROM todos.task 
             INNER JOIN todos.person ON todos.task.user_id = todos.person.id 
             WHERE todos.task.deleted_at IS NULL AND todos.person.id = $1;`,
            [UserId]
        );

        res.json(result.map(task => ({
            id: task.id,
            title: task.title,
            done: task.status !== 'active'
        })));
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.patch('/tasks/:id', async (req, res) => {
    try {
        const result = await db.none("UPDATE todos.task SET status = 'done' WHERE id = $1", [req.params.id]);
        res.json({ ok: true });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        await db.none("UPDATE todos.task SET deleted_at = NOW() WHERE id = $1", [req.params.id]);
        res.json({ ok: true });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getuser', async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
            console.error('Email is required');
            return res.status(400).json({ error: 'Email is required' });
        }

        const result = await db.oneOrNone('SELECT id AS user_id FROM todos.person WHERE email = $1;', [email]);

        if (result) {
            res.json(result);
        } else {
            console.error('User not found for email:', email);
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/newuser', async (req, res) => {
    try {
        const result = await db.one(`
            INSERT INTO todos.person (name, email, pass) 
            VALUES($1, $2, $3) 
            RETURNING *
        `, [
            req.body.Name,
            req.body.Email,
            req.body.password,
        ]);

        console.log('result', result);

        res.json({
            name: result.name,
            email: result.email,
            password: result.pass
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/addFirstTask', async (req, res) => {
    try {
        const result = await db.one(`
            INSERT INTO todos.task
            (user_id, title, tags, description, status, created_at)
            VALUES($1, $2, '{}'::text[], '', 'active', NOW()) 
            RETURNING *
        `, [
            req.body.UserId,
            'Welcome to our ToDoApp.'
        ]);

        console.log('result', result);

        res.json({
            user_id: result.user_id,
            title: result.title,
            tags: result.tags,
            description: result.description,
            status: result.status,
            created_at: result.created_at
        });
    } catch (error) {
        console.error('Error inserting task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen('3300', () => {
    console.log('the server is now running and listening for requests');
});
