import { useStudioStore } from "../state/store";
import { SliderRow } from "./ui/SliderRow";
import { SwitchRow } from "./ui/SwitchRow";
import { CollapsibleSection } from "./ui/CollapsibleSection";
import type { ResolutionPreset } from "../state/types";

export function GlobalPanel() {
  const global = useStudioStore((s) => s.global);
  const setGlobal = useStudioStore((s) => s.setGlobal);
  const requestResetAll = useStudioStore((s) => s.requestResetAll);

  return (
    <div className="panel globalPanel">
      <div className="panelHeader">
        <div className="brand">
          <h1>Particle Studio</h1>
          <span>GPU • layers • masks</span>
        </div>
      </div>

      <div className="panelBody">
        {/* Playback controls */}
        <div className="section">
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <button
              className="btn"
              style={{ flex: 1 }}
              onClick={() => setGlobal({ paused: !global.paused })}
            >
              {global.paused ? "▶ Resume" : "⏸ Pause"}
            </button>
            <button className="btn btnDanger" onClick={requestResetAll}>
              Reset
            </button>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center" }}>
            <span className="kbd">Space</span>
            <span className="kbd">R</span>
            <span className="kbd">S</span>
            <span className="kbd">H</span>
          </div>
        </div>

        <div className="hr" />

        {/* Global rendering sliders */}
        <CollapsibleSection title="Global" defaultOpen={true}>
          <SliderRow
            label="Time scale"
            value={global.timeScale}
            min={0}
            max={2}
            step={0.01}
            onChange={(v) => setGlobal({ timeScale: v })}
          />
          <SliderRow
            label="Exposure"
            value={global.exposure}
            min={0}
            max={2}
            step={0.01}
            onChange={(v) => setGlobal({ exposure: v })}
          />
          <SliderRow
            label="Threshold"
            value={global.threshold}
            min={0}
            max={1}
            step={0.001}
            onChange={(v) => setGlobal({ threshold: v })}
          />
          <SliderRow
            label="Threshold soft"
            value={global.thresholdSoft}
            min={0}
            max={0.35}
            step={0.001}
            onChange={(v) => setGlobal({ thresholdSoft: v })}
          />
          <SliderRow
            label="Threshold gain"
            value={global.thresholdGain}
            min={0}
            max={3}
            step={0.01}
            onChange={(v) => setGlobal({ thresholdGain: v })}
          />
          <SliderRow
            label="Clear rate"
            value={global.clearRate}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => setGlobal({ clearRate: v })}
          />
        </CollapsibleSection>

        <div className="hr" />

        {/* Visual effects */}
        <CollapsibleSection title="Visual" defaultOpen={true}>
          <SwitchRow
            label="Monochrome"
            checked={global.monochrome}
            onCheckedChange={(b) => setGlobal({ monochrome: b })}
          />
          <SwitchRow
            label="Invert"
            checked={global.invert}
            onCheckedChange={(b) => setGlobal({ invert: b })}
          />
        </CollapsibleSection>

        <div className="hr" />

        {/* Resolution */}
        <CollapsibleSection title="Resolution" defaultOpen={false}>
          <div className="row">
            <span className="rowLabel">Preset</span>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {(["512x512", "1080x1080", "2048x2048", "custom"] as ResolutionPreset[]).map((preset) => (
                <button
                  key={preset}
                  className={`btn btnSm ${global.resolutionPreset === preset ? "btnPrimary" : ""}`}
                  onClick={() => setGlobal({ resolutionPreset: preset })}
                >
                  {preset === "custom" ? "Custom" : preset}
                </button>
              ))}
            </div>
          </div>

          {global.resolutionPreset === "custom" && (
            <>
              <div className="row">
                <span className="rowLabel">Width</span>
                <input
                  type="number"
                  className="input inputSm"
                  style={{ width: 80 }}
                  value={global.customWidth}
                  min={256}
                  max={4096}
                  step={1}
                  onChange={(e) => setGlobal({ customWidth: parseInt(e.target.value, 10) || 256 })}
                />
              </div>
              <div className="row">
                <span className="rowLabel">Height</span>
                <input
                  type="number"
                  className="input inputSm"
                  style={{ width: 80 }}
                  value={global.customHeight}
                  min={256}
                  max={4096}
                  step={1}
                  onChange={(e) => setGlobal({ customHeight: parseInt(e.target.value, 10) || 256 })}
                />
              </div>
            </>
          )}

          <div className="small" style={{ marginTop: 8, opacity: 0.7 }}>
            Canvas/output resolution for all exports.
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
