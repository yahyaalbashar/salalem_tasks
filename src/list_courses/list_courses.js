import React, { Component } from 'react';
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import client from "../apollo_client"
import gql from "graphql-tag";
import Section from "./sections"

class ListCourses extends Component {
  state={
    courses_list:[],
    display:''
  }


 getCourses(){
   const thisComponent=this
   const client_query={
    query: gql`
    {
      
        courses(first: 10, title_Icontains: "سبوع"){
     
          edges{
            node{
              title
              children{
                ... on UnitNode{
                  id
                  title
                  children{

                    __typename
                    ... on LOSBlockNode{
                      title
                      resource{
                        title
                      }
                    }
                    ... on MultipleChoiceQuestionBlockNode{
                      title
                      resource{
                        id
                        title
                        answers{
                          title
                          isCorrect
                        }
                      }
                    }
                    ... on VideoBlockNode{
                      title
                      resource{
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }  
      }
  
    `
  }
  client.query(client_query).then((response)=>{
    return response
  }).then((response)=>{
    thisComponent.setState({
      courses_list:response.data.courses.edges
    })
  })

 }

 showChild(){
   console.log(this.state.display)
    return this.setState({display:'initial'}) 
 }
componentDidMount(){
  this.courses_list=[]
  this.getCourses()
  this.showChild()
  
}
  render() {

    const {courses_list}=this.state
    const {display}=this.state.display
    // console.log(courses_list)
  
    return (
       <ApolloProvider client={client}>
    <div style={{textAlign:'right',marginRight:'20px'}} >
      
      {courses_list.map((chapter,index)=>{
          return <div key={index}>
        <h1 style={{color:'red'}} onClick={()=>this.showChild()} >{chapter.node.title}</h1>
        {chapter.node.children.map((section,index)=>{
          if(section.children !== undefined){
            return <div key={index}>
            <Section display={display} content={section.title} />
            {/* <h2 style={{color:'blue'}} ref='section' >{section.title}</h2> */}
            {section.children.map((resource,index)=>{
              return <div key={index}>
                <h3 style={{color:'green'}}>{resource.title}</h3>
              </div>
            })}
            </div>
       
          }
          else{
            return <div key={index}>
            <h2 style={{color:'blue'}}>{section.title}</h2>
            </div>
          }

              
        })
        
        
        }
               
    </div>
     
      })}
     
</div>
  
  </ApolloProvider>

    );
  }
}

export default ListCourses;
