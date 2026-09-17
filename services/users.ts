import { supabaseConfig } from '@/api/supabase-config';
import { IUser } from '@/interfaces';
export const registerUser = async (payload: Partial<IUser>) => {
  try {
    // step 1 : create authentication record
    const authResponse = await supabaseConfig.auth.signUp({
      email: payload.email || '',
      password: payload.password || '',
    });
    if (authResponse.error) {
      throw authResponse.error;
    }
    // step 2 : insert user profile in database
    const dbResponse = await supabaseConfig.from('user_profiles').insert([
      {
        name: payload.name,
        email: payload.email,
        role: payload.role || 'customer',
        is_active: payload.role === 'customer' ? true : false,
        profile_picture: '',
      },
    ]);
    if (dbResponse.error) {
      throw dbResponse.error;
    }
    // step 3 : return success response
    return {
      success: true,
      message: 'User registered successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Registration failed', // it's like a fallback; returns (error as Error).message   otherwise, 'Registration failed'
    };
  }
};

export const loginUser = async (payload: Partial<IUser>) => {
  try {
    // step 1 : authenticate user
    const authResponse = await supabaseConfig.auth.signInWithPassword({
      email: payload.email || '',
      password: payload.password || '',
    });
    if (authResponse.error) {
      throw authResponse.error;
    }

    const user = authResponse.data.user;
    const email = user?.email;

    // step 2 : fetch full user profile from database
    const dbResponse = await supabaseConfig
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .single(); // only one record needed
    if (dbResponse.error) {
      throw dbResponse.error;
    }

    // step 3 : return success response
    return {
      success: true,
      message: 'Login successful',
      data: dbResponse.data,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Login failed',
    };
  }
};

//get user dtails if there is a session which means the user was at least logged in once
/* 
Old implementation not caring a futur call in a hook with react-query
export const getLoggedInUser = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabaseConfig.auth.getSession(); // supabase runs it from the local storage
    if (error) {
      throw error;
    }
    const user = session?.user;
    const email = user?.email;

    const dbResponse = await supabaseConfig
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (dbResponse.error) {
      throw dbResponse.error;
    }
    //console.log('get user', dbResponse.data);
    return {
      success: true,
      message: 'Logged in user fetched successfully',
      data: dbResponse.data,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to fetch logged in user',
    };
  }
}; */

// the below function, not like the previous one, is a pure service ready to be used by react query from @tanstack/react query
export const getLoggedInUser = async () => {
  // 1. Get the local session
  const {
    data: { session },
    error: authError,
  } = await supabaseConfig.auth.getSession();

  if (authError) throw authError;
  if (!session?.user) throw new Error('No active session found');

  const email = session.user.email;

  // 2. Fetch the deeper profile from your database table
  const { data: profileData, error: dbError } = await supabaseConfig
    .from('user_profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (dbError) throw dbError; // Strictly throw to notify TanStack Query

  // Return just the clean profile data structure
  console.log('react query date--------', profileData);
  return profileData;
};

export const logoutUser = async () => {
  try {
    await supabaseConfig.auth.signOut();
    //router.replace(fallBackRoute);
    return {
      success: true,
      message: 'Logged out successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed login out',
    };
  }
};
