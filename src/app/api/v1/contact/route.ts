import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { contactService } from '@/modules/contact/contact.service';
import { apiResponse } from '@/core/utils/response';
import { errorHandler } from '@/core/errors/errorHandler';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const contact = await contactService.submitContactForm(body);
    return apiResponse.created(contact);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const searchParams = req.nextUrl.searchParams;
    const query = Object.fromEntries(searchParams.entries());

    const contacts = await contactService.getAllSubmissions(query);
    return apiResponse.success(contacts);
  } catch (error) {
    return errorHandler(error);
  }
}
