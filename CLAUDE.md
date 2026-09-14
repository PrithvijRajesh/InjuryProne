# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Name

InjuryProne

## Project Description

An interactive web application for someone dealing with injurt or soreness from athletic activity or lifting. The user would see an interactive model of the human body and can click on the place on the body that corresponds to where they have the pain or soreness. The user can then select symptoms they see and will be given most likely diagnosis and how they can recover.

## Stack

Vite + React + TypeScript, single-page app, no backend yet. Framer Motion for animated transitions (zoom into a muscle group). No routing library — view state is a simple selection in `App.tsx`. Body diagram is SVG polygon shapes adapted from the open-source `react-body-highlighter` project (`src/data/muscleGroups.ts`). Flow is intentionally flat: click a muscle group on the body map → confirmation screen → (next feature) symptom questions. No per-muscle sub-picker inside a group — tried that, decided it added a step without enough value, kept the group-level click only.

## Rules

1. I have technical background so you can explain everything with technical terms but do not be too technical
2. I prefer shorter and more concise explanations and instructions 
3. Do not move from the working project directory and ask for permissions and give an explanation for why you need to move
4. Stay within the project scope that is decribed in the prd.md 
5. Read the prd.md to understand the project and scope of the project
6. Focus on one feature at a time, just focus on the item that is current focus
7. Before adding a service confirm with me and explain why it is needed
8. Create 2 md files if they do not exist yet, one called WorkLog and one called FeatueAnalysis, after each feature is implemented you will add to each md file, the WorkLog will just go over when the feature was completed and updated as feature milestones are completed saying what the milestone was, the FeatureAnalysis will explain the feature so I understand how it was implemented and why it is important.

## Current Focus

For each diagnosis creating recovery tips and prevention tips.
