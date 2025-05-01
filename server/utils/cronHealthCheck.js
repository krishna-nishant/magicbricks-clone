import cron from 'node-cron';
import axios from 'axios';

export const startHealthCheckCron = () => {
  // Schedule a task to run every 14 minutes
  cron.schedule('*/14 * * * *', async () => {
    try {
      const serverUrl = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 3000}`;
      console.log(`🔔 Pinging health endpoint to prevent sleep: ${serverUrl}/health`);
      const response = await axios.get(`${serverUrl}/health`);
      console.log(`✅ Health check response: ${response.status}`);
    } catch (error) {
      console.error('❌ Failed to ping health endpoint:', error.message);
    }
  });
}; 