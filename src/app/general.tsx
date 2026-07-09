import Button from "@/components/common/button";
import ConfirmModal from "@/components/common/confirm-modal";
import ScoreCard from "@/components/general/score-card";
import { PlayerScore } from "@/models/score-card";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "../components/common/themed-view";

export default function General() {
  const [players, setPlayers] = React.useState<PlayerScore[]>([]);
  const [toDelete, setToDelete] = React.useState<number | null>(null);

  const addPlayer = () => {
    const maxId = players.map((p) => p.id).reduce((a, b) => Math.max(a, b), 0);
    setPlayers([
      ...players,
      { id: maxId + 1, name: `Player ${maxId + 1}`, score: 0 },
    ]);
  };

  const updatePlayer = (id: number, player: PlayerScore) => {
    setPlayers(players.map((p) => (p.id === id ? player : p)));
  };

  const deletePlayer = (id: number) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  return (
    <ScrollView
      style={{ width: "100%", height: "100%" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ThemedView style={styles.container}>
        {players.map((player) => (
          <ScoreCard
            key={player.id}
            playerName={player.name ? player.name : "--"}
            score={player.score}
            onScoreChange={(newScore) =>
              updatePlayer(player.id, { ...player, score: newScore })
            }
            onNameChange={(newName) =>
              updatePlayer(player.id, { ...player, name: newName })
            }
            onDelete={() => setToDelete(player.id)}
          />
        ))}
        <Button variant="text" onPress={addPlayer} label="Add Player" />
      </ThemedView>
      <ConfirmModal
        title="Delete Player"
        message="Do you want to delete this player? The score will be lost."
        isVisible={toDelete !== null}
        onConfirm={() => {
          deletePlayer(toDelete!);
          setToDelete(null);
        }}
        onCancel={() => setToDelete(null)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: 24,
    gap: 16,
  },
});
