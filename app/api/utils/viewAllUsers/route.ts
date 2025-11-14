import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import connectDB from '@/utils/db';

export const GET = async (req: Request) => {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const sportType = searchParams.get('sport');
        const name = searchParams.get('name');
        const age = searchParams.get('age');
        const minAge = searchParams.get('minAge');
        const maxAge = searchParams.get('maxAge');
        
        // Build the filter object
        const filter: any = {};

        // Filter by sport type (case-insensitive)
        if (sportType) {
            filter.sports = { $regex: new RegExp(sportType, 'i') };
        }

        // Filter by name (case-insensitive partial match)
        if (name) {
            filter.name = { $regex: new RegExp(name, 'i') };
        }

        // Filter by exact age
        if (age && !isNaN(parseInt(age))) {
            filter.age = parseInt(age);
        }

        // Filter by age range (only if exact age is not provided)
        if (!age && ((minAge && !isNaN(parseInt(minAge))) || (maxAge && !isNaN(parseInt(maxAge))))) {
            const ageFilter: any = {};
            if (minAge && !isNaN(parseInt(minAge))) {
                ageFilter.$gte = parseInt(minAge);
            }
            if (maxAge && !isNaN(parseInt(maxAge))) {
                ageFilter.$lte = parseInt(maxAge);
            }
            filter.age = ageFilter;
        }

        const users = await User.find(filter)
            .select('-password -__v')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: users.length,
            data: users,
            filters: {
                sport: sportType,
                name: name,
                age: age,
                minAge: minAge,
                maxAge: maxAge
            }
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch users',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}