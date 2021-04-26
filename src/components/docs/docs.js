import { Container } from "react-bootstrap";

const Docs = () => {
  return (
    <div
      style={{
        width: "100%",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <Container
        style={{
          maxWidth: 800,
          color: "white",
          textAlign: "left",
          fontSize: 14,
        }}
      >
        <h1>Evolutionary Algorithm</h1>
        <p1>
          In computer science and operations research, a genetic algorithm is a
          metaheuristic inspired by the process of natural selection that
          belongs to the larger class of evolutionary algorithms. Genetic
          algorithms are commonly used to generate high-quality solutions to
          optimization and search problems by relying on biologically inspired
          operators such as mutation, crossover and selection.
        </p1>
        <br></br>
        <br></br>
        <h5>
          This is the complete roadmap we will be following in the developement
          process <br></br>( you can interact with it )
        </h5>
        <br></br>
        <a
          href="https://whimsical.com/creature-methods-SEs8P7kNmtkGotTmwCUkFm"
          target="_blank"
        >
          Link for the board
        </a>
        <br></br>
        <iframe
          style={{ border: "none" }}
          width="800"
          height="450"
          src="https://whimsical.com/embed/SEs8P7kNmtkGotTmwCUkFm"
        ></iframe>
        <br></br>
        <br></br>
        <h5>Features of the simulations are :</h5>
        <ul>
          <li>Play/Pause and Stop simulation</li>
          <br />
          <li>
            <p>Manually we can set the following :</p>
            <ul>
              <li>Initial population</li>
              <li>Creature speed</li>
              <li>Food spawning speed</li>
            </ul>
          </li>
          <br />
          <li>
            <p>Manually we can set multiple calamities :</p>
            <ul>
              <li>Volcano</li>
              <li>Earth quake</li>
              <li>Radiation</li>
              <li>Plague</li>
            </ul>
          </li>
          <br />
          <li>
            <p>Manually we can add different natural resouces :</p>
            <ul>
              <li>Water bodies</li>
            </ul>
          </li>
          <br />
          <p>More features are to be added...</p>
        </ul>
      </Container>
    </div>
  );
};

export default Docs;
