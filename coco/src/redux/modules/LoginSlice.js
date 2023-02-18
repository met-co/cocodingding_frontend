// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// axios.defaults.withCredentials = true;
// const initialState = {
//   kakaoList: {},
//   isLoading: false,
//   error: null,
//   isLogin: false,
// };

// //로그인 POST요청
// export const __kakaoLogin = createAsyncThunk(
//   'login',
//   async (payload, thunkAPI) => {
//     try {
//       console.log(payload);
//       const { data } = await axios
//         .post(`https://cocodingding.shop/user/kakao`, payload, {
//           withCredentials: true,
//         })

//         .then((res) => {
//           const accessToken = res.headers.authorization;
//           sessionStorage.setItem('accessToken', accessToken);
//           console.log(res);
//           return res;
//         });
//       console.log(data);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// const kakaoList = createSlice({
//   name: 'kakaoList',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [__kakaoLogin.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [__kakaoLogin.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.isLogin = true;
//     },
//   },
// });

// export default kakaoList.reducer;

// FIXME: 6조코드최신화
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//카카오 로그인
export const __kakaologin = createAsyncThunk(
  'kakaologin',
  //전달 받은 코드 비동기로 처리
  async (code, thunkAPI) => {
    try {
      console.log('페이로드?', code);
      const data = await axios
        .post(
          'https://cocodingding.shop/user/kakao',
          { code },
          {
            withCredentials: true,
            // headers: {
            //   Authorization: 'Bearer ' + localStorage.getItem('token'),
            // },
          }
        )
        .then((res) => {
          console.log('서버에서 보내는값?', res);
          const email = res.data.data.email;
          localStorage.setItem('email', email);
          localStorage.setItem('socialCode', 'KAKAO');

          if (res.data.message !== 'non-member') {
            const accessToken = res.headers.get('Authorization');
            const nickname = res.data.data.nickname;
            console.log(nickname);
            localStorage.setItem('token', accessToken);
            localStorage.setItem('nickname', nickname);
            alert('그님스에 오신걸 환영합니다');
            return window.location.assign('/main');

            //멤버가 아닐시 프로필 정보를 받는 페이지로 돌려야함
          } else if (res.data.message === 'non-member') {
            alert('그님스를 이용하려면 프로필 정보를 입력해줘야합니다.');
            return window.location.assign('/signup/setProfileName');
          }
          // const accessToken = res.headers.get("Authorization");
          // const nickname = res.data.nickname;
          // const email = res.data.email;

          // // 유저 토큰,닉네임,이메일이 있다면 가져온 후 세팅
          // if (accessToken && nickname && email) {
          //   localStorage.setItem("token", accessToken);
          //   localStorage.setItem("nickname", nickname);
          //   localStorage.setItem("email", email);
          //   alert(`소셜로그인 인증 완료! ${nickname}님 환영합니다!`);
          //   return window.location.assign("/");
          // }
          // else {
          //   alert("인증 오류! 다시 시도해주세요!");
          //   return window.location.assign("/");
          // }
        });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      window.location.assign('/');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  error: null,
  isLoading: false,
  message: '',
  email: '',
};

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: {
    //카카오 소셜로그인
    [__kakaologin.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaologin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.loginCheck = true;
      state.email = action.payload;
    },
    [__kakaologin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { isLoading, isLogin, setMessage } = LoginSlice.actions;
export default LoginSlice.reducer;
//FIXME: 6조코드
// export const __kakaologin = createAsyncThunk(
//   'kakaologin',
//   //전달 받은 코드 비동기로 처리
//   async (code, thunkAPI) => {
//     try {
//       console.log('페이로드?', code);
//       const data = await axios
//         .post(
//           'https://cocodingding.shop/user/kakao',
//           { code },
//           {
//             withCredentials: true,
//             headers: {
//               Authorization: 'Bearer ' + localStorage.getItem('token'),
//             },
//           }
//         )

//         .then((res) => {
//           console.log('서버로 보내는값?', res.data);
//           const accessToken = res.headers.get('Authorization');
//           const nickname = res.data.nickname;
//           const email = res.data.email;

//           //유저 토큰,닉네임,이메일이 있다면 가져온 후 세팅
//           if (accessToken && nickname && email) {
//             localStorage.setItem('token', accessToken);
//             localStorage.setItem('nickname', nickname);
//             localStorage.setItem('email', email);
//             alert(`소셜로그인 인증 완료! dd님 환영합니다!`);
//             // alert(`소셜로그인 인증 완료! ${nickname}님 환영합니다!`);

//             return window.location.assign('/');
//           } else {
//             alert('인증 오류! 다시 시도해주세요!');
//             return window.location.assign('/');
//           }
//         });
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       console.log('sssss');
//       window.location.assign('/');
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
// const LoginSlice = createSlice({
//   name: 'login',
//   initialState: {},
//   reducer: {},
//   extraReducers: {
//     //로그인
//     [__kakaologin.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [__kakaologin.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.loginCheck = true;
//     },
//     [__kakaologin.rejected]: (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export default LoginSlice.reducer;
