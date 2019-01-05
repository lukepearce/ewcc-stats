import React from 'react'
import { graphql, Link } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'

const getUser = async (event, context) => {
  const { identity, user } = context.clientContext;
  const userID = user.sub;
  const userUrl = `${identity.url}/admin/users/{${userID}}`;
  const adminAuthHeader = "Bearer " + identity.token;

  try {
    return fetch(userUrl, {
      method: "GET",
      headers: { Authorization: adminAuthHeader }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("data", JSON.stringify(data));
        return { statusCode: 204 };
      })
      .catch(e => {
        console.log("Failed to get user! 500! Internal.");
        return {
          statusCode: 500,
          body: "Internal Server Error: " + e
        };
      });
  } catch (e) {
    console.log("GOT HERE! 500! outer");
    return { statusCode: 500, body: "Internal Server Error: " + e };
  }
};

const IndexPage = (props) => {
  const members = props.data.stravaClub.clubData;

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Our Members</h1>

      {members.map((member, i) => {
        return (
          <div key={i}>
            <p style={{marginBottom: '0'}}>{member.firstname} {member.lastname}</p>
          </div>
        )
      })}

    </Layout>
  );
};

export default IndexPage

export const query = graphql`
  {
    stravaClub {
      clubData {
        firstname
        lastname
      }
    }
  }
`;
