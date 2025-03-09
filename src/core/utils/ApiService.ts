import { NextResponse } from "next/server";
import pool from "../lib/db";

export class ApiService {
  /**
   * Fetch a single record by ID
   */
  static async fetch(query: string, params: any[]) {
    try {
      const [rows]: any = await pool.query(query, params);

      if (rows.length === 0) {
        return ApiService.errorResponse("Resource not found", 404);
      }

      return ApiService.successResponse("Data retrieved successfully", rows[0]);
    } catch (error) {
      return ApiService.handleError();
    }
  }

  /**
   * Fetch all records
   */
  static async fetchAll(query: string, params: any[] = []) {
    try {
      const [rows]: any = await pool.query(query, params);
      return ApiService.successResponse("Data retrieved successfully", rows);
    } catch (error) {
      return ApiService.handleError();
    }
  }

  /**
   * Insert a new record
   */
  static async insert(query: string, params: any[]) {
    try {
      const [result]: any = await pool.query(query, params);

      if (!result.insertId) {
        return ApiService.errorResponse("Failed to insert data", 500);
      }

      return ApiService.successResponse("Data inserted successfully", { id: result.insertId });
    } catch (error) {
      return ApiService.handleError();
    }
  }

  /**
   * Update an existing record
   */
  static async update(query: string, params: any[]) {
    try {
      const [result]: any = await pool.query(query, params);

      if (result.affectedRows === 0) {
        return ApiService.errorResponse("No records updated", 404);
      }

      return ApiService.successResponse("Data updated successfully");
    } catch (error) {
      return ApiService.handleError();
    }
  }

  /**
   * Delete a record
   */
  static async delete(query: string, params: any[]) {
    try {
      const [result]: any = await pool.query(query, params);

      if (result.affectedRows === 0) {
        return ApiService.errorResponse("No records deleted", 404);
      }

      return ApiService.successResponse("Data deleted successfully");
    } catch (error) {
      return ApiService.handleError();
    }
  }

  /**
   * Standardized success response
   */
static successResponse(message: string, data: any = null) {
    return NextResponse.json({ message, data, error: null }, { status: 200 });
  }

  /**
   * Standardized error response
   */
  static errorResponse(message: string, statusCode: number) {
    return NextResponse.json({ message, data: null, error: message }, { status: statusCode });
  }

  /**
   * Handle Errors
   */
  private static handleError() {
    return ApiService.errorResponse("Internal Server Error", 500);
  }

  public static async fetchRequest(
    url:string,
    method:('GET' | 'POST' | 'PUT' | 'DELETE') = 'GET'
) {
    const data =  await fetch(process.env.NEXTAUTH_URL + `api${url}`, {
        method: method,
        next: {
            tags: [url]
        },
        headers: {
            'api_key': '3yJH8g5k9L2mN1pQ4rT6vW8xZ0aB7cD5eF3hI2jK4lM6nO1pQ2rT5vW8xZ0aB7cD',
            'Content-Type': 'application/json'
        }
    })
    const res= await data.json()
    return res
  }
}

export interface AppResponse {
    message: string
    data: string,
    error: string
} 
