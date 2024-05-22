import type { NextApiRequest, NextApiResponse } from 'next';
import pool from "@/lib/db";
import redis from '@/lib/redis';
import ApiResponse from "@/utils/ApiResponse";
import {GET, OPTIONS, POST, REDIS_KEY_TODO} from "@/constant/constant";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if(req.method === OPTIONS) {
    return ApiResponse.success().send(res)
  }

  if (req.method === POST) {

    const { description } = req.body;

    if (!description) {
      return ApiResponse.error('description is required').send(res)
    }

    try {
      // add new one
      const [result] = await pool.query('INSERT INTO todos (description) VALUES (?)', [description]);

      // update redis
      const [rows] = await pool.query('SELECT * FROM todos');
      await redis.set(REDIS_KEY_TODO, JSON.stringify(rows), { EX: 3600 * 24 });

      return ApiResponse.success().send(res)
    } catch (error) {
      return ApiResponse.error((error as Error).message)
    }
  } else {
    res.setHeader('Allow', [GET, POST]);
    return ApiResponse.error(`Method ${req.method} Not Allowed`).send(res);
  }
}

