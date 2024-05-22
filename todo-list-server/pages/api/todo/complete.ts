import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import redis from '@/lib/redis';
import {COMPLETED, OPTIONS, POST, REDIS_KEY_TODO} from "@/constant/constant";
import ApiResponse from "@/utils/ApiResponse";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if(req.method === OPTIONS) {
    return ApiResponse.success().send(res)
  }

  if (req.method === POST) {
    try {

      const { id } = req.body

      if (!id) {
        return ApiResponse.error("Job id is required").send(res);
      }

      // update db
      await pool.query('UPDATE todos SET completed = ? WHERE id = ?', [COMPLETED, id]);

      // update redis
      await redis.del(REDIS_KEY_TODO)

      return ApiResponse.success().send(res)
    } catch (error) {
      return ApiResponse.error((error as Error).message).send(res)
    }
  } else {
    res.setHeader('Allow', [POST]);
    return ApiResponse.error(`Method ${req.method} Not Allowed`).send(res);
  }
}
