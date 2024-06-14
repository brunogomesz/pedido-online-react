import { Container } from "./styles"

interface SnacksProps {
  snacks: any[]
}

export function Snacks({ snacks }: SnacksProps){
  return (
    <Container>
      {/* Em um ambiente normal de JavaScript colocariamos a {} depois do => porque vai vim uma função em seguida, mas em jsx colocamos () */}
      {snacks.map((snack) => (
        <div key={snack.id} className="snack">
          <h2>{snack.name}</h2>
          <img src={snack.image} alt={snack.name} />
          <p>{snack.description}</p>
          <div>
            <strong>{snack.price}</strong>
            <button type='button'></button>
          </div>
        </div>
      ))}
    </Container>
  )
}
