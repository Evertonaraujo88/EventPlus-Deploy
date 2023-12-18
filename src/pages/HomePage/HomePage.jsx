import React, { useEffect, useState } from "react";
import "./HomePage.css";

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import api from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import { nextEventResource, backEventResource } from "../../Services/Service";
import BackEvent from "../../components/BackEvent/BackEvent";


const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification
  const [backEvents, setBackEvents] = useState([]);

  // roda somente na inicialização do componente
  useEffect(() => {
   
    getNextEvents(); //chama a função
    getBackEvents();
  }, []);
 async function getNextEvents() {
      try {
        const promise = await api.get(nextEventResource);
        const dados = await promise.data;
        // console.log(dados);
        setNextEvents(dados); //atualiza o state
        

      } catch (error) {
        console.log("não trouxe os próximos eventos, verifique lá!");
        // setNotifyUser({
        //   titleNote: "Erro",
        //   textNote: `Não foi possível carregar os próximos eventos. Verifique a sua conexão com a internet`,
        //   imgIcon: "danger",
        //   imgAlt:
        //   "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        //   showMessage: true,
        // });
      }
    }

    async function getBackEvents() {
      try {
        const promise = await api.get(backEventResource);
        const dados = await promise.data;
        // console.log(dados);
        setBackEvents(dados); //atualiza o state
        

      } catch (error) {
        console.log("não trouxe os próximos eventos, verifique lá!");
        // setNotifyUser({
        //   titleNote: "Erro",
        //   textNote: `Não foi possível carregar os próximos eventos. Verifique a sua conexão com a internet`,
        //   imgIcon: "danger",
        //   imgAlt:
        //   "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        //   showMessage: true,
        // });
      }
    }


  return (
    
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">
            {nextEvents.map((e) => {
              return (
                <NextEvent
                  key={e.idEvento}
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvent={e.idEvento}
                  buttonLink = {"/eventos-aluno"}
                  buttonText = {"Conectar"}
                />
              );
            })}
          </div>
        </Container>
      </section>


      {/* EVENTOS antigos */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Eventos Antigos"} />

          <div className="events-box">
            {nextEvents.map((e) => {
              return (
                <BackEvent
                key={e.idEvento}
                title={e.nomeEvento}
                description={e.descricao}
                eventDate={e.dataEvento}
                idEvent={e.idEvento}
                buttonText = {"Visualizar"}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
