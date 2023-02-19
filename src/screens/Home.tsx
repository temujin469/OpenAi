import { Image } from 'antd';
import React, { useEffect, useState } from 'react';

import { Card, FormField, Loader } from '../components';
import Loading from '../components/Loading';
import usePosts from '../hooks/usePosts';

type Props = {
  data: any,
  title: string
}

const RenderCards = ({ data, title }: Props) => {
  if (data?.length > 0) {
    return (
      data.map((post: any) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const { posts, loading, error, getPosts } = usePosts();

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  useEffect(() => {
    getPosts()
  }, []);

  const handleSearchChange = (e: any) => {
    clearTimeout(searchTimeout as any);
    setSearchText(e.target.value);

    // setSearchTimeout(
    //   setTimeout(() => {
    //     const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
    //     setSearchedResults(searchResult);
    //   }, 500),
    // );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-bold text-[#222328] text-2xl md:text-[32px]">Олон нийтийн үзэсгэлэн</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">DALL-E AI-аар бүтээгдсэн уран сэтгэмжтэй, гайхалтай зургуудын цуглуулгыг үзээрэй.</p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Нийтлэл хайх"
          type="text"
          name="text"
          placeholder="Ямар нэг зүйл хайх..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Үр дүнг харуулж байна<span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={posts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;