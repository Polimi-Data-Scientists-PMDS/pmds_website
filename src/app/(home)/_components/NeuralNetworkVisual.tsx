const neuralLayers = [
  { x: 72, nodes: [86, 166, 246, 326, 406] },
  { x: 200, nodes: [58, 118, 178, 238, 298, 358, 418] },
  { x: 340, nodes: [82, 150, 218, 286, 354, 422] },
  { x: 468, nodes: [150, 250, 350] },
];

export default function NeuralNetworkVisual() {
  const connections = neuralLayers.slice(0, -1).flatMap((layer, layerIndex) => {
    const nextLayer = neuralLayers[layerIndex + 1];

    return layer.nodes.flatMap((sourceY, sourceIndex) =>
      nextLayer.nodes.map((targetY, targetIndex) => ({
        key: `${layerIndex}-${sourceIndex}-${targetIndex}`,
        x1: layer.x,
        y1: sourceY,
        x2: nextLayer.x,
        y2: targetY,
      })),
    );
  });

  return (
    <div
      className="relative h-full min-h-[500px] overflow-hidden border bg-background before:pointer-events-none before:absolute before:top-1/2 before:left-1/2 before:aspect-square before:w-[70%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-accent/10 before:blur-[70px] lg:min-h-[640px]"
      aria-hidden="true"
    >
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 lg:top-6 lg:right-6">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping bg-accent opacity-60" />
          <span className="relative inline-flex size-2 bg-accent" />
        </span>
        <span className="type-label text-foreground-secondary">Processing</span>
      </div>

      <svg
        className="absolute inset-0 size-full p-4 lg:p-6"
        viewBox="0 0 540 480"
        fill="none"
      >
        <g>
          {connections.map((connection) => (
            <line
              key={connection.key}
              className="stroke-border stroke-[0.5]"
              x1={connection.x1}
              y1={connection.y1}
              x2={connection.x2}
              y2={connection.y2}
            />
          ))}
        </g>

        <g className="fill-none stroke-accent stroke-1 [stroke-dasharray:2_180] [stroke-linecap:round]">
          <path
            className="animate-[neural-signal_4.5s_linear_infinite] drop-shadow-[0_0_5px_rgba(75,111,254,0.9)]"
            d="M72 86 200 178 340 286 468 250"
          />
          <path
            className="animate-[neural-signal_4.5s_linear_infinite] drop-shadow-[0_0_5px_rgba(75,111,254,0.9)] [animation-delay:-1.5s]"
            d="M72 246 200 238 340 218 468 150"
          />
          <path
            className="animate-[neural-signal_4.5s_linear_infinite] drop-shadow-[0_0_5px_rgba(75,111,254,0.9)] [animation-delay:-3s]"
            d="M72 406 200 358 340 354 468 350"
          />
        </g>

        {neuralLayers.map((layer, layerIndex) => (
          <g key={layer.x}>
            {layer.nodes.map((y, nodeIndex) => (
              <g key={y}>
                <circle
                  className={`origin-center fill-background-secondary stroke-border stroke-1 transform-fill ${
                    nodeIndex % 2 === 0
                      ? `animate-[node-pulse_3s_ease-in-out_infinite] ${
                          [
                            '',
                            '[animation-delay:-0.75s]',
                            '[animation-delay:-1.5s]',
                            '[animation-delay:-2.25s]',
                          ][layerIndex]
                        }`
                      : ''
                  }`}
                  cx={layer.x}
                  cy={y}
                  r="12"
                />
                <circle
                  className={
                    nodeIndex % 2 === 0
                      ? 'fill-accent drop-shadow-[0_0_5px_rgba(75,111,254,0.8)]'
                      : 'fill-ink/45'
                  }
                  cx={layer.x}
                  cy={y}
                  r="4"
                />
              </g>
            ))}
          </g>
        ))}
      </svg>

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between border-t pt-4 lg:inset-x-6 lg:bottom-6 lg:pt-6">
        <div className="text-center type-label text-foreground-secondary">
          Input
          <br />
          05 nodes
        </div>
        <div className="text-center type-label text-foreground-secondary">
          Hidden layer 01
          <br />
          07 nodes
        </div>
        <div className="text-center type-label text-foreground-secondary">
          Hidden layer 02
          <br />
          06 nodes
        </div>
        <div className="text-center type-label text-foreground-secondary">
          Output
          <br />
          03 nodes
        </div>
      </div>
    </div>
  );
}
