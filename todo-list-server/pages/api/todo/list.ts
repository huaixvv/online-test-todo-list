import type { NextApiRequest, NextApiResponse } from 'next';
import pool from "@/lib/db";
import redis from '@/lib/redis';
import ApiResponse from "@/utils/ApiResponse";
import {GET, REDIS_KEY_TODO} from "@/constant/constant";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === GET) {
    try {
      // get from redis
      const cachedTodos = await redis.get(REDIS_KEY_TODO) as string;
      const cached = JSON.parse(cachedTodos)
      if (cached?.length === 0) {
        return ApiResponse.success(cached).send(res)
      }

      // get from db
      const [rows] = await pool.query('SELECT * FROM todos');

      // set db
      await redis.set(REDIS_KEY_TODO, JSON.stringify(rows), { EX: 3600 * 24 });
      console.log(rows);
      ApiResponse.success(rows).send(res)
    } catch (error) {
      return ApiResponse.error((error as Error).message)
    }
  } else {
    res.setHeader('Allow', [GET]);
    return ApiResponse.error(`Method ${req.method} Not Allowed`).send(res);
  }
}
