import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from '../supabase'


const Insert = () => {

  //계정 확인 추가
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])


  const navigate = useNavigate(); //useNavigate 초기화 (실행)

  const [ data, setData ] = useState({
    title: '',
    content: ''
  })
  
  const [file, setFile] = useState(null);

  const handleChange = (e)=>{
    let {name, value} = e.target;
    setData({
      ...data, //기존데이터 풀어헤치기 title:제목..
      [name] : value
    })
  }

  const handleFileChange = (e)=>{
    //사용자가 첨부한 file 정보 가져오기
    const attatchFile = e.target.files[0];
    setFile(attatchFile);
  }

  //로그아웃
  const handleSignOut = ()=>{
    supabase.auth.signOut();
    navigate('/');
  }

  // Upload file using standard upload
  async function uploadFile(file) {

    //업로드시 파일명 생성
    const fileName = `${Date.now()}-${file.name}`; //202501061907-code...jpg
    const filePath = `thumbnail/${fileName}`;
    const { data, error } = await supabase.storage.from('project').upload(filePath, file)
    if (error) {
      alert('파일 업로드 실패');
      console.log(error);
    } else {
      // Handle success
      alert('파일 업로드 성공');
      console.log(data);
      
      //파일경로 출력하도록 추가
      return filePath;
    }
  }


  async function InsertData(e){
    e.preventDefault();

    //전역변수로 범위 지정
    let thumbnailPath = null;

    //첨부한 파일이 있다면
    if(file){
      const uploadedFilePath = await uploadFile(file);
      if(uploadedFilePath){
        thumbnailPath = uploadedFilePath;
      }
    }   

    const { error } = await supabase
    .from('projects')
    .insert({ title: data.title, content: data.content, thumbnail: thumbnailPath })
    

    if(error){
      alert('입력 실패');
      console.log(error);
    }else{
      alert('입력 성공');
      navigate('/');
    }

  }

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (
      <div>
        <Header />
        <main className="content">
        <div className="container about_content shadow">
              <div className="form">
                  <h3 className="heading6 mb-3">Add Project</h3>
                  <div className="contact_form">
                      <form action="" onSubmit={ InsertData }>
                          <p className="field">
                              <label for="title">Title: </label>
                              <input type="text" name="title" id="title" onChange={ handleChange } placeholder="Your project title"/>
                          </p>
                          <p className="field">
                              <label for="content">Content: </label>
                              <textarea name="content" id="content" cols="30" rows="10" onChange={ handleChange } placeholder="Your project description"></textarea>
                          </p>
                          <p className="field">
                              <label for="file">Thumbnail: </label>
                              <input type="file" id="file" name="thumbnail" onChange={ handleFileChange }/>
                          </p>
                          <p className="submit">
                              <input type="submit" className="primary-btn" value="Add project"/>
                          </p>

                          <button className="mt-3" type="button" onClick={ handleSignOut }>로그아웃</button>
                      </form>
                  </div>
              </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
};

export default Insert;
