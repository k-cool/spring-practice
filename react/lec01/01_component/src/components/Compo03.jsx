const data = [
  { name: "sx", age: 10 },
  { name: "sy", age: 20 },
  { name: "sz", age: 30 },
];

export default function Compo03() {
  return (
    <div style={styleObj}>
      Compo03
      <div>
        {data.map(({ name, age }) => (
          <div>
            {name} / {age}
          </div>
        ))}
      </div>
    </div>
  );
}

const styleObj = {
  color: "red",
  border: "5px solid purple",
};
