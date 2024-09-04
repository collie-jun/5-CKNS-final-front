import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import FindPage from './pages/searchPage/searchingPage';
import FlightResultPage from './pages/resultPage/flightResultPage';
import HotelResultPage from './pages/resultPage/hotelResultPage';
import MainPage from './pages/mainPage/mainPage';
import MainDetailPage from './pages/mainPage/mainDetailPage';
import LoginPage from './pages/userPage/loginPage';
import Callback from './pages/userPage/oAuth2LoginSuccessPage';
import MyPage from './pages/userPage/myPage';
import Nickname from './pages/userPage/nicknamePage';
import MapPage from './pages/mapPage/mapPage';
import SchedulePage from './pages/schedulePage/schedulePage';
import FixSchedulePage from './pages/schedulePage/fixschedulePage';
import AlarmPage from './pages/userPage/alarmPage';
import IntroPage from './pages/introPage/introPage';
import HotelDetailPage from './pages/resultPage/hotelDetailPage';
import ScheduleDetail from './pages/schedulePage/scheduleDetailPage';
import WishListPage from './pages/schedulePage/wishListPage';
import MapLocationPage from './pages/schedulePage/mapLocationPage';
import CreateSchedulePage from './pages/schedulePage/createSchedulePage';
import PrivacyPage from './pages/mainPage/privacyPage';
import ChatPage from './pages/chatPage/chatPage';
import ChatTest from './pages/chatPage/chatTest';
import ChatListPage from './pages/chatPage/chatListPage';

import './App.css';
import './i18n';

import { requestForToken } from './firebase'; // FCM 관련 임포트

const libraries = ['places'];

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('visited');
    if (isFirstVisit) {
      localStorage.setItem('visited', 'true');
      navigate('/intro');
    }
  }, [navigate]);

  useEffect(() => {
    requestForToken(); // FCM 토큰 요청
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/maindetail/:id" element={<MainDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<FindPage />} />
        <Route path="/flight" element={<FlightResultPage />} />
        <Route path="/hotel" element={<HotelResultPage />} />
        <Route path="/hotel/hotel-detail" element={<HotelDetailPage />} />
        <Route path="/login/oauth2/success" element={<Callback />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/schedule/:travelRoomId" element={<ScheduleDetail />} />
        <Route path="/edit/:travelRoomId" element={<FixSchedulePage />} />
        <Route path="/wishlist/:travelRoomId" element={<WishListPage />} />
        <Route path="/maplocation/:travelRoomId" element={<MapLocationPage />} />
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/createschedule" element={<CreateSchedulePage />} />
        <Route path="/fixschedule/:travelRoomId" element={<FixSchedulePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/chat/:travelRoomId" element={<ChatPage />} />
        <Route path="/chat/test" element={<ChatTest />} />
        <Route path="/chatList" element={<ChatListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
