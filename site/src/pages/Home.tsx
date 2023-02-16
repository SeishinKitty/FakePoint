import React from "react";

const Home = () => {
  return (
    <>
      <h1>Home Site</h1>
      <div className="card">
        <h2>
          Fake News!
        </h2>
        <hr />
        <p>The text of these fake news. These news have been faked!</p>
      </div>
      <div className="card">
        <h2>
          Even Faker News!
        </h2>
        <hr />
        <p>These newes do not contain even a word of truth! Read now and get hoodwinked into believing complete BS!</p>
      </div>
      <div className="card">
        <h2>
          Is This True?
        </h2>
        <hr />
        <p>Almost everything in this article completely irrelevant. In fact almost all of its contents are just fillers. But, if you read the second to last paragraph you will see, that this news is also fake!</p>
      </div>
    </>
  )
};

export default Home;
