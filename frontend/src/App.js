    import React from 'react'
    import {MainPage,LicensePreview,Alert,Background,ContactPage,CheckEmail,ProfilePage,SelectLicense,Checkout,TextArea,BeatPage,PlayBar,LoginContainer,Signup_with_email,Footer,Beats,Header,About,FAQ,Eror,ResetPassword, ResetPasswordConfirm, Activate,Lyrics,Google} from "./File-bundle";
    import {Routes, Route} from "react-router-dom";


    function App() {
        return (
            <div className="wrapper  background">
                <Background/>
                <Header/>
                <PlayBar/>
                <TextArea/>
                <Alert/>
                <SelectLicense/>
                <LicensePreview/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/login" element={<LoginContainer/>}/>
                        <Route path="/google" element={<Google/>}/>
                        <Route path="/reset_password" element={<ResetPassword/>}/>
                        <Route path="/check_email" element={<CheckEmail/>}/>
                        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>}/>
                        <Route path="/activate/:uid/:token" element={<Activate/>}/>
                        <Route path="/beat/:id" element={<BeatPage/>}/>
                        <Route path='/profile' element={<ProfilePage/>}/>
                        <Route path="/contact" element={<ContactPage/>}/>
                        <Route path="/signup" element={<Signup_with_email/>}/>
                        <Route path="/Beats" element={<Beats/>}/>
                        <Route path="/faq" element={<FAQ/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/checkout" element={<Checkout/>}/>
                        <Route path="/lyrics" element={<Lyrics/>}/>
                        <Route path="*" element={<Eror/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        );
    }

export default App;
