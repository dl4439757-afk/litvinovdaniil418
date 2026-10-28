import React from 'react';
import { StateCounter, ObjectState, EffectTimer, EffectEvent, ReducerTodos, StaleClosureDemo } from './BasicHooks';
import { MemoDemo, CallbackDemo, RefDemo, ContextDemo } from './AdvancedHooks';
import { LocalStorageDemo, FetchDemo, DebounceDemo, WindowSizeDemo, PreviousDemo, ToggleDemo } from './CustomHooks';

export default function HooksTests() {
  return (
    <div>
      <div className="section">
        <h2>Часть 2: Базовые хуки</h2>
        <StateCounter />
        <ObjectState />
        <EffectTimer />
        <EffectEvent />
        <ReducerTodos />
        <StaleClosureDemo />
      </div>
      <div className="section">
        <h2>Часть 3: Продвинутые хуки</h2>
        <MemoDemo />
        <CallbackDemo />
        <RefDemo />
        <ContextDemo />
      </div>
      <div className="section">
        <h2>Часть 4: Кастомные хуки</h2>
        <LocalStorageDemo />
        <FetchDemo />
        <DebounceDemo />
        <WindowSizeDemo />
        <PreviousDemo />
        <ToggleDemo />
      </div>
    </div>
  );
}
