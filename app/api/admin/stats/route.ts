import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get total enquiries
    const totalEnquiries = await Enquiry.countDocuments();
    
    // Get enquiries by status
    const statusStats = await Enquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get enquiries by course interest
    const courseStats = await Enquiry.aggregate([
      {
        $group: {
          _id: '$courseInterest',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get today's enquiries
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayEnquiries = await Enquiry.countDocuments({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    });
    
    // Get this week's enquiries
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnquiries = await Enquiry.countDocuments({
      createdAt: {
        $gte: weekStart
      }
    });
    
    // Get this month's enquiries
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    
    const monthEnquiries = await Enquiry.countDocuments({
      createdAt: {
        $gte: monthStart
      }
    });
    
    // Get recent enquiries (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentEnquiries = await Enquiry.find({
      createdAt: {
        $gte: sevenDaysAgo
      }
    }).sort({ createdAt: -1 }).limit(5);
    
    return NextResponse.json({
      totalEnquiries,
      todayEnquiries,
      weekEnquiries,
      monthEnquiries,
      statusStats: statusStats.reduce((acc: any, stat: any) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
      courseStats: courseStats.reduce((acc: any, stat: any) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
      recentEnquiries,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
