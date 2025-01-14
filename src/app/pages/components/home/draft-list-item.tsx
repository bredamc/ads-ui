import React, {FunctionComponent, useState} from "react";
import {Draft} from "@app/models";
import {
    ActionList,
    ActionListItem,
    Button,
    Dropdown,
    DropdownItem, DropdownSeparator,
    Flex,
    FlexItem,
    KebabToggle
} from "@patternfly/react-core";
import "./draft-list-item.css";
import {ArtifactTypeIcon} from "@app/components/artifact-type-icon";

export type DraftListItemProps = {
    draft: Draft;
    onEdit: () => void;
    onDelete: () => void;
    onDownload: () => void;
    onRegister: () => void;
}

export const DraftListItem: FunctionComponent<DraftListItemProps> = (
    {draft, onEdit, onDelete, onDownload, onRegister}: DraftListItemProps) => {

    const [ isToggleOpen, setToggleOpen ] = useState(false);

    const onActionSelect: (event?: React.SyntheticEvent<HTMLDivElement>) => void = (event) => {
        // @ts-ignore
        const action: string = event?.target.attributes["data-id"].value;
        setToggleOpen(false);
        switch (action) {
            case "action-edit":
                onEdit();
                return;
            case "action-delete":
                onDelete();
                return;
            case "action-download":
                onDownload();
                return;
            case "action-register":
                onRegister();
                return;
        }
    };

    return (
        <div className="draft-item">
            <div className="draft-item-icon">
                <ArtifactTypeIcon type={draft.type} />
            </div>
            <div className="draft-item-info">
                <div className="name">{draft.name}</div>
                <div className="summary">{draft.summary||"(Design or schema with no summary)"}</div>
            </div>
            <div className="draft-item-actions">
                <ActionList>
                    <ActionListItem>
                        <Button variant="secondary" onClick={onEdit}>Edit</Button>
                    </ActionListItem>
                    <ActionListItem>
                        <Dropdown
                            onSelect={onActionSelect}
                            toggle={<KebabToggle onToggle={setToggleOpen} />}
                            isOpen={isToggleOpen}
                            isPlain
                            dropdownItems={
                                [
                                    <DropdownItem key="action-edit" data-id="action-edit">Edit</DropdownItem>,
                                    <DropdownItem key="action-download" data-id="action-download">Download</DropdownItem>,
                                    <DropdownItem key="action-register" data-id="action-register">Export to Service Registry</DropdownItem>,
                                    <DropdownSeparator key="action-sep-1" />,
                                    <DropdownItem key="action-delete" data-id="action-delete">Delete</DropdownItem>,
                                ]
                            }
                            position="right"
                        />
                    </ActionListItem>
                </ActionList>
            </div>
        </div>
    );
};
