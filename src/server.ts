import fastify, { FastifyInstance } from "fastify";
import { reportFeedbackRoutes } from './routes/report-feedback.routes';

const app: FastifyInstance = fastify({ logger: true });

app.register(reportFeedbackRoutes, {
    prefix: '/report-feedback'
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