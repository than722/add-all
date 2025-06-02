'use client';

import React, { useState, useEffect } from 'react';
import { initialCourseOutline, moduleProgress, subsectionProgress } from '@/data/data';

// ProgressCircle component
function ProgressCircle({ percent }: { percent: number }) {
	const radius = 10;
	const stroke = 3;
	const normalizedRadius = radius - stroke / 2;
	const circumference = normalizedRadius * 2 * Math.PI;
	const strokeDashoffset = circumference - (percent / 100) * circumference;
	return (
		<svg height={radius * 2} width={radius * 2}>
			<circle
				stroke="#e5e7eb"
				fill="transparent"
				strokeWidth={stroke}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
			<circle
				stroke="#92D0D3"
				fill="transparent"
				strokeWidth={stroke}
				strokeLinecap="round"
				strokeDasharray={circumference + ' ' + circumference}
				style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.3s' }}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
		</svg>
	);
}

export default function CourseOutlinePage() {
	const [expandedModule, setExpandedModule] = useState<number | null>(null);
	const [selectedModule, setSelectedModule] = useState<number>(initialCourseOutline[0].id);
	const [search, setSearch] = useState('');
	const [courseOutline, setCourseOutline] = useState(initialCourseOutline);
	const [role, setRole] = useState<string | null>(null);

	// Editing state
	const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
	const [editingSubId, setEditingSubId] = useState<number | null>(null);
	const [editModuleTitle, setEditModuleTitle] = useState('');
	const [editModuleContent, setEditModuleContent] = useState('');
	const [editSubTitle, setEditSubTitle] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setRole(localStorage.getItem('role'));
		}
	}, []);

	// Filter modules by search
	const filteredModules = courseOutline.filter((mod) =>
		mod.title.toLowerCase().includes(search.toLowerCase()) ||
		mod.subsections.some((sub) => sub.title.toLowerCase().includes(search.toLowerCase()))
	);

	const selected = courseOutline.find((mod) => mod.id === selectedModule);

	// Handlers for editing
	const startEditModule = (mod: any) => {
		setEditingModuleId(mod.id);
		setEditModuleTitle(mod.title);
		setEditModuleContent(mod.content);
	};
	const saveEditModule = (modId: number) => {
		setCourseOutline((prev) =>
			prev.map((mod) =>
				mod.id === modId
					? { ...mod, title: editModuleTitle, content: editModuleContent }
					: mod
			)
		);
		setEditingModuleId(null);
	};
	const cancelEditModule = () => {
		setEditingModuleId(null);
	};

	const startEditSub = (sub: any) => {
		setEditingSubId(sub.id);
		setEditSubTitle(sub.title);
	};
	const saveEditSub = (modId: number, subId: number) => {
		setCourseOutline((prev) =>
			prev.map((mod) =>
				mod.id === modId
					? {
							...mod,
							subsections: mod.subsections.map((sub: any) =>
								sub.id === subId ? { ...sub, title: editSubTitle } : sub
							),
					  }
					: mod
			)
		);
		setEditingSubId(null);
	};
	const cancelEditSub = () => {
		setEditingSubId(null);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
			{/* Sidebar */}
			<div className="w-full md:w-1/3 bg-white p-6 shadow-lg md:min-h-screen">
				<h2 className="text-xl font-bold text-[#002B5C] mb-4">Course Outline</h2>
				<input
					type="text"
					placeholder="Search modules..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#92D0D3]"
				/>
				<ul className="space-y-2">
					{filteredModules.length === 0 && (
						<li className="text-gray-400 italic">No modules found.</li>
					)}
					{filteredModules.map((mod) => (
						<li key={mod.id}>
							{role === 'teacher' && editingModuleId === mod.id ? (
								<div className="mb-2">
									<input
										className="w-full mb-1 px-2 py-1 border rounded"
										value={editModuleTitle}
										onChange={e => setEditModuleTitle(e.target.value)}
									/>
									<textarea
										className="w-full mb-1 px-2 py-1 border rounded"
										value={editModuleContent}
										onChange={e => setEditModuleContent(e.target.value)}
									/>
									<div className="flex gap-2">
										<button
											className="bg-[#92D0D3] text-white px-2 py-1 rounded"
											onClick={() => saveEditModule(mod.id)}
										>
											Save
										</button>
										<button
											className="bg-gray-300 text-[#002B5C] px-2 py-1 rounded"
											onClick={cancelEditModule}
										>
											Cancel
										</button>
									</div>
								</div>
							) : (
								<>
									<button
										className={`w-full text-left px-3 py-2 rounded font-semibold transition ${selectedModule === mod.id ? 'bg-[#92D0D3] text-white' : 'hover:bg-gray-100 text-[#002B5C]'}`}
										onClick={() => {
											setExpandedModule(expandedModule === mod.id ? null : mod.id);
											setSelectedModule(mod.id);
										}}
									>
										{mod.title}
									</button>
									{role === 'teacher' && (
										<button
											className="text-xs text-[#002B5C] underline ml-2"
											onClick={() => startEditModule(mod)}
										>
											Edit
										</button>
									)}
								</>
							)}
							{/* Progress bar under module name */}
							<div className="mt-1 mb-2">
								<div className="w-full bg-gray-200 rounded h-2">
									<div
										className="bg-[#92D0D3] h-2 rounded"
										style={{ width: `${moduleProgress[mod.id] || 0}%`, transition: 'width 0.3s' }}
									/>
								</div>
								<div className="text-xs text-gray-500 mt-1">{moduleProgress[mod.id] || 0}% complete</div>
							</div>
							{/* Subsections */}
							{expandedModule === mod.id && (
								<ul className="ml-4 mt-1 space-y-1">
									{mod.subsections.map((sub) => (
										<li key={sub.id} className="text-sm text-gray-700 flex items-center gap-2">
											<ProgressCircle percent={subsectionProgress[sub.id] || 0} />
											{role === 'teacher' && editingSubId === sub.id ? (
												<>
													<input
														className="px-1 py-0.5 border rounded text-sm"
														value={editSubTitle}
														onChange={e => setEditSubTitle(e.target.value)}
													/>
													<button
														className="text-xs text-[#92D0D3] underline"
														onClick={() => saveEditSub(mod.id, sub.id)}
													>
														Save
													</button>
													<button
														className="text-xs text-gray-400 underline"
														onClick={cancelEditSub}
													>
														Cancel
													</button>
												</>
											) : (
												<>
													<span>• {sub.title}</span>
													{role === 'teacher' && (
														<button
															className="text-xs text-[#002B5C] underline ml-1"
															onClick={() => startEditSub(sub)}
														>
															Edit
														</button>
													)}
												</>
											)}
											<span className="text-xs text-gray-400 ml-1">{subsectionProgress[sub.id] || 0}%</span>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
			</div>
			{/* Content Area */}
			<div className="flex-1 p-8">
				{selected ? (
					<div className="bg-white rounded-xl shadow p-6">
						{role === 'teacher' && editingModuleId === selected.id ? (
							<>
								<h3 className="text-2xl font-bold text-[#002B5C] mb-2">
									<input
										className="w-full px-2 py-1 border rounded"
										value={editModuleTitle}
										onChange={e => setEditModuleTitle(e.target.value)}
									/>
								</h3>
								<textarea
									className="w-full mb-4 px-2 py-1 border rounded"
									value={editModuleContent}
									onChange={e => setEditModuleContent(e.target.value)}
								/>
								<div className="flex gap-2 mb-4">
									<button
										className="bg-[#92D0D3] text-white px-2 py-1 rounded"
										onClick={() => saveEditModule(selected.id)}
									>
										Save
									</button>
									<button
										className="bg-gray-300 text-[#002B5C] px-2 py-1 rounded"
										onClick={cancelEditModule}
									>
										Cancel
									</button>
								</div>
							</>
						) : (
							<>
								<h3 className="text-2xl font-bold text-[#002B5C] mb-2">{selected.title}</h3>
								<p className="text-gray-700 mb-4">{selected.content}</p>
							</>
						)}
						<h4 className="text-lg font-semibold text-[#002B5C] mb-2">Subsections</h4>
						<ul className="list-disc list-inside text-gray-700 space-y-1">
							{selected.subsections.map((sub) => (
								<li key={sub.id} className="flex items-center gap-2">
									{role === 'teacher' && editingSubId === sub.id ? (
										<>
											<input
												className="px-1 py-0.5 border rounded text-sm"
												value={editSubTitle}
												onChange={e => setEditSubTitle(e.target.value)}
											/>
											<button
												className="text-xs text-[#92D0D3] underline"
												onClick={() => saveEditSub(selected.id, sub.id)}
											>
												Save
											</button>
											<button
												className="text-xs text-gray-400 underline"
												onClick={cancelEditSub}
											>
												Cancel
											</button>
										</>
									) : (
										<>
											{sub.title}
											{role === 'teacher' && (
												<button
													className="text-xs text-[#002B5C] underline ml-1"
													onClick={() => startEditSub(sub)}
												>
													Edit
												</button>
											)}
										</>
									)}
								</li>
							))}
						</ul>
					</div>
				) : (
					<div className="text-gray-500 italic">Select a module to view its content.</div>
				)}
			</div>
		</div>
	);
}
