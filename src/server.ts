import cors from '@fastify/cors';
import 'dotenv/config';
import fastify, { FastifyInstance } from "fastify";
import { commentReportFeedbackRoutes } from './routes/comment.route';
import { reportFeedbackRoutes } from './routes/report-feedback.routes';

const app: FastifyInstance = fastify({ logger: true });

app.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

app.register(reportFeedbackRoutes, {
    prefix: '/report-feedback'
})

app.register(commentReportFeedbackRoutes, {
    prefix: '/admin'
})

const start = async () => {
    try {
        await app.listen({ port: 3001, host: '0.0.0.0' });
        console.log('🔥 Server is running on port 3001 🔥');
    } catch (err) {
        app.log.error(err);
    }
};

start();