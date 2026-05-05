type Props = {
  title: string;
  subtitle: string;
};

export const GameHeader = ({ title, subtitle }: Props) => {
  return (
    <header
      style={{
        background: "#FFFFFF",
        borderBottom: "4px solid #1D2540",
        boxShadow: "0 5px 0 #1D2540",
        padding: "16px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Espaço da personagem */}
        <div style={{ width: 120 }} />

        {/* Título */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              background: "#5B22A8",
              color: "#FFD23F",
              padding: "6px 16px",
              borderRadius: 999,
              fontWeight: "bold",
              fontSize: 12,
              marginBottom: 6,
            }}
          >
            FÁBRICA DE HISTÓRIAS
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 28,
              color: "#5B22A8",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: "#1D2540",
              opacity: 0.8,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Elemento decorativo */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#FFD23F",
          }}
        />
      </div>
    </header>
  );
};
