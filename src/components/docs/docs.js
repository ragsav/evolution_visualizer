import { Container } from "react-bootstrap";

const Docs = () => {
  return (
    <Container style={{ maxWidth: 800, color: "white", textAlign: "left" }}>
      <h1>Evolutionary Algorithm</h1>
      <p1>
        In computer science and operations research, a genetic algorithm is a
        metaheuristic inspired by the process of natural selection that belongs
        to the larger class of evolutionary algorithms. Genetic algorithms are
        commonly used to generate high-quality solutions to optimization and
        search problems by relying on biologically inspired operators such as
        mutation, crossover and selection.
      </p1>

      <br></br>
      <br></br>
      <h5>
        This the complete roadmap we will be following in the developement
        process <br></br>( you can interact with it )
      </h5>
      <br></br>
      <iframe
        style={{ border: "none" }}
        width="800"
        height="450"
        src="https://whimsical.com/embed/SEs8P7kNmtkGotTmwCUkFm"
      ></iframe>
    </Container>
  );
};

export default Docs;
