import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from '../supabase'

const Home = ({ data }) => {
    console.log(data);

    const getThumbnailUrl = (path)=>{
        
        //첨부파일 경로 출력
        const { data:thumbnailData } = supabase
        .storage
        .from('project')
        .getPublicUrl(path)
        
        return thumbnailData.publicUrl;
    }

  return (
    <div>
      <Header />
      <main className="content">
      <div className="container latest_portfolio">
            <div className="row intro">
                <div className="col-md-4">
                    <div className="contents shadow">
                        <h2 className="heading2">I'm alikerock</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="contents shadow">
                        <h2 className="heading2">I create super awesome stuff</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="contents shadow">
                        <h2 className="heading2">I'm available for freelance projects</h2>
                    </div>
                </div>
            </div>
            <div className="row list">
            {data.slice(0, 3).map((item) => (
                  <div key={item.id} className="col-md-4">
                      <div className="contents shadow">
                          <img src={getThumbnailUrl(item.thumbnail)} alt={item.title}/>
                          <div className="hover_contents">
                              <div className="list_info">
                                  <h3><a href={`/portfolio/${item.id}`}>{item.title}</a> 
                                  <img src="images/portfolio_list_arrow.png" alt="list arrow"/></h3>
                                  <p><a href={`/portfolio/${item.id}`}>Click to see project</a></p>
                              </div>
                          </div>
                      </div>
                  </div>
                ))}
            </div>
            <p className="porfolio_readmore">
                <a href="/" className="primary-btn">See my full portfolio</a>        
            </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
