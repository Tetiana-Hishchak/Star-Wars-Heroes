import React, { useEffect, useState } from 'react';
import ReactFlow, { Controls, Background, Node, Edge } from 'react-flow-renderer';

import { fetchHeroData } from '../../utils/fetchHeroData';
import './HeroGraph.scss';

const HeroGraph: React.FC<{ heroId: number }> = ({ heroId }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { nodes, edges } = await fetchHeroData(heroId);
        setNodes(nodes);
        setEdges(edges);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [heroId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="hero__graph" style={{ height: '600px' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default HeroGraph;

