export const dynamic = 'force-dynamic'

import { ConnectDB } from '../../../lib/config/db'
import ResourcesModel from '../../../lib/models/ResourcesModel'
import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Connect to DB once
ConnectDB().catch(err => console.error('DB connection error:', err))

// GET all resources
export async function GET(request) {
  try {
    const url = new URL(request.url)
    const year = url.searchParams.get('year')
    const department = url.searchParams.get('department')
    const category = url.searchParams.get('category')

    const query = {}
    if (year) query.year = year
    if (department) query.department = department
    if (category) query.category = category

    const resources = await ResourcesModel.find(query)
    if (resources.length === 0) {
      return NextResponse.json(
        { message: 'No resources found for the given parameters' },
        { status: 404 }
      )
    }
    return NextResponse.json({ resources })
  } catch (error) {
    console.error('Error fetching resources:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}

const SECRET_KEY = process.env.JWT_SECRET

// Helper: upload file to Cloudinary
async function uploadFileToCloudinary(file, resourceType = 'auto') {
  const buffer = Buffer.from(await file.arrayBuffer())
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType, folder: 'resources' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          return reject(error)
        }
        resolve(result.secure_url)
      }
    )
    try {
      uploadStream.end(buffer)
    } catch (e) {
      console.error('Cloudinary stream error:', e)
      reject(e)
    }
  })
}

// POST new resource
export async function POST(request) {
  console.log(`🔥 Hit POST /api/resources at ${new Date().toISOString()}`)
  try {
    const formData = await request.formData()

    // Log incoming form data keys
    for (let [key, val] of formData) {
      console.log('📦 formData:', key, val)
    }

    const token = request.cookies.get('token')?.value
    if (!token) {
      console.error('♻️ No token in cookies')
      return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 })
    }

    if (!SECRET_KEY) {
      console.error('Missing SECRET_KEY')
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    let decoded
    try {
      decoded = jwt.verify(token, SECRET_KEY)
    } catch (err) {
      console.error('JWT Verification Failed:', err)
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 })
    }

    const userEmail = decoded.user?.email
    if (!userEmail) {
      console.error('♻️ Invalid token payload – no user.email')
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 })
    }

    // Required fields
    const title = formData.get('title')
    const category = formData.get('category')
    if (!title || !category) {
      console.error('❌ Missing title or category')
      return NextResponse.json(
        { error: 'Missing required fields: title or category' },
        { status: 400 }
      )
    }

    // Handle file uploads
    const imageFile = formData.get('image')
    const pdfFile = formData.get('pdf')

    let imgUrl = null
    let pdfUrl = null

    if (imageFile instanceof File && imageFile.size > 0) {
      console.log('⬆️ Uploading image to Cloudinary…')
      imgUrl = await uploadFileToCloudinary(imageFile, 'image')
      console.log('⬇️ Image URL:', imgUrl)
    }

    if (pdfFile instanceof File && pdfFile.size > 0) {
      console.log('⬆️ Uploading PDF to Cloudinary…')
      pdfUrl = await uploadFileToCloudinary(pdfFile, 'raw')
      console.log('⬇️ PDF URL:', pdfUrl)
    }

    // Build resource object
    const resourceData = {
      title,
      description: formData.get('description') || '',
      category,
      author: formData.get('author') || '',
      image: imgUrl,
      pdf: pdfUrl,
      department: formData.get('department') || '',
      semester: formData.get('semester') || '',
      year: formData.get('year') || '',
      email: userEmail,
      createdAt: new Date(),
    }

    // Save to MongoDB
    const created = await ResourcesModel.create(resourceData)
    console.log('✅ Resource created with ID:', created._id)

    return NextResponse.json({ success: true, msg: 'Resource Added' })
  } catch (error) {
    console.error('Error in POST API:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
