import { useState, useCallback } from "react";
import { useStudioStore } from "../state/store";
import { AudioControls } from "./AudioControls";
import { AudioMappingEditor } from "./AudioMappingEditor";
import { CollapsibleSection } from "./ui/CollapsibleSection";
import type { AudioAnalysisData } from "../engine/AudioEngine";

export function AudioExportPanel() {
  const [audioAnalysis, setAudioAnalysis] = useState<AudioAnalysisData | null>(null);
  
  const handleAudioAnalysis = useCallback((data: AudioAnalysisData) => {
    setAudioAnalysis(data);
  }, []);

  return (
    <div className="panel audioExportPanel">
      <div className="panelHeader">
        <h2 className="panelTitle">Audio & Mapping</h2>
      </div>

      <div className="panelBody">
        {/* Audio reactivity */}
        <AudioControls onAnalysisUpdate={handleAudioAnalysis} />

        <div className="hr" />

        {/* Audio mapping for selected layer */}
        <AudioMappingEditor />

        <div className="hr" />

        <div className="small">
          Upload an audio file to drive particles with bass, mid, treble, and beat detection. Map audio bands to any layer parameter.
        </div>
      </div>
    </div>
  );
}
